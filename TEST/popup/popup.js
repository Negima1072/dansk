window.addEventListener("load", (ex) => {
    getCookie = (name) => {
        var value = null;
        Array.from(document.cookie.split("; ")).forEach((v) => {
            if(name == v.split("=")[0]) value = v.split("=")[1];
        });
        return value;
    }

    setCookie = (name, value) => {
        document.cookie = name + "=" + value;
        return document.cookie;
    }

    if(getCookie("dnsk_pp_before") == null){
        setCookie("dnsk_pp_before", "");
    }else{
        document.getElementById("before").value = getCookie("dnsk_pp_before").replaceAll("{break}","\n");
    }
    if(getCookie("dnsk_pp_after") == null){
        setCookie("dnsk_pp_after", "");
    }else{
        document.getElementById("after").value = getCookie("dnsk_pp_after").replaceAll("{break}","\n");
    }
    if(getCookie("dnsk_pp_before_type") == null){
        setCookie("dnsk_pp_before_type", "domo");
    }else{
        document.getElementById("before_select").value = getCookie("dnsk_pp_before_type");
    }
    if(getCookie("dnsk_pp_after_type") == null){
        setCookie("dnsk_pp_after_type", "dansk");
    }else{
        document.getElementById("after_select").value = getCookie("dnsk_pp_after_type");
    }

    document.getElementById("copy_a").onclick = (ev) => {
        navigator.clipboard.writeText(
            document.getElementById("after").value
        ).then(() => {
            alert('コピーしました。');
        });
    };

    document.getElementById("clear").onclick = (ev) => {
        document.getElementById("before").value = "";
        document.getElementById("after").value = "";
    };

    document.getElementById("replace").onclick = (ev) => {
        var b = document.getElementById("before").value;
        var b_type = document.getElementById("before_select").value;
        var a_type = document.getElementById("after_select").value;

        document.getElementById("after").value = convertText(b_type, a_type, b);

        setCookie("dnsk_pp_before", document.getElementById("before").value.replaceAll("\n", "{break}"));
        setCookie("dnsk_pp_after", document.getElementById("after").value.replaceAll("\n", "{break}"));
        setCookie("dnsk_pp_before_type", document.getElementById("before_select").value);
        setCookie("dnsk_pp_after_type", document.getElementById("after_select").value);
    };

    document.getElementById("repair").onclick = (ev) => {
        var a = document.getElementById("after").value;
        var a_type = document.getElementById("after_select").value;
        var b_type = document.getElementById("before_select").value;

        document.getElementById("before").value = convertText(a_type, b_type, a);

        setCookie("dnsk_pp_before", document.getElementById("before").value.replaceAll("\n", "{break}"));
        setCookie("dnsk_pp_after", document.getElementById("after").value.replaceAll("\n", "{break}"));
        setCookie("dnsk_pp_before_type", document.getElementById("before_select").value);
        setCookie("dnsk_pp_after_type", document.getElementById("after_select").value);
    };

    convertText = (bt, at, btext) => {
        if(bt == at) return btext;
        var btt = "";
        if(bt == "domo") btt = convertDomoToDansk(btext);
        else if (bt == "dansk") btt = btext;
        else if (bt == "tokome") btt = convertTokomeToDansk(btext);
        else btt = "";
        if(at == "dansk") return btt;
        else if(at == "domo") return convertDanskToDomo(btt);
        else if(at == "tokome") return convertDanskToTokome(btt);
        else return "";
    }

    convertDomoToDansk = (btext) => {
        btext = btext.replace(/\r\n|\r/g,"\n").replace(/\n/g,"\n<br>").replace(/\t/g,"[tb]");
        btext = btext.split('\n');
        var r = []
        var compoint = 0;
        for(l=0;l<btext.length;l++){
            if(compoint == -1){
                btext[l] = btext[l].replace("<br>","");
            }
            compoint = 0;
            for(c in Array("ue", "shita", "gothic", "mincho", "big", "small", "defont", "medium", "ender", "full", "cs", "patissier")){
                if(btext[l].includes(c)) compoint++;
            }
            if(compoint>=2) {
                r.push("\n["+btext[l].replace("<br>","")+"]");
                compoint = -1;
            }
            else r.push(btext[l]);
        }
        return r.join('').slice(1);
    }

    convertDanskToDomo = (btext) => {
        btext = btext.replaceAll("[tb]","\t").replaceAll("[03]","　").replaceAll("[0A]","");
        btext = btext.split("\n");
        var r = []
        var bcommand = "";
        for(l=0;l<btext.length;l++){
            var r2c = "";
            var r2b = "";
            if(btext[l] == "") continue;
            r2c = /\[.+?\]/.exec(btext[l])
            if(r2c == null) {
                r2c = bcommand;
                r2b = btext[l];
            }else{
                r2b = btext[l].slice(r2c[0].length);
                r2c = r2c[0].slice(1,-1);
                if(r2c == "03" || r2c == "tb" || r2c == "0A"){
                    r2c = bcommand;
                    r2b = btext[l];
                }
                bcommand = r2c;
            }
            r2b = r2b.replaceAll("<br>","\n")
            r.push(r2c+"\n"+r2b);
        }
        return r.join("\n");
    }

    convertTokomeToDansk = (btext) => {
        btext = JSON.parse(btext);
        var r = [];
        for(l=0;l<btext.length;l++){
            r.push(("["+btext[l].command+"]"+btext[l].comment).replaceAll("\n","<br>").replaceAll("\t","[tb]"));
        }
        return r.join("\n");
    }

    convertDanskToTokome = (btext) => {
        btext = btext.replaceAll("[tb]","\t").replaceAll("[03]","　").replaceAll("[0A]","");
        btext = btext.split("\n");
        var r = []
        var bcommand = "";
        for(l=0;l<btext.length;l++){
            var r2 = {
                time: "00:00.00",
                command: "",
                comment: ""
            };
            if(btext[l] == "") continue;
            btext[l] = btext[l].replaceAll("<br>","\n")
            r2.command = /\[.+?\]/.exec(btext[l])
            if(r2.command == null) {
                r2.command = bcommand;
                r2.comment = btext[l];
            }
            else{
                r2.comment = btext[l].slice(r2.command[0].length);
                r2.command = r2.command[0].slice(1,-1);
                if(r2.command == "03" || r2.command == "tb" || r2.command == "0A") {
                    r2.command = bcommand;
                    r2.comment = btext[l];
                }
                bcommand = r2.command;
            }
            r.push(r2);
        }
        return JSON.stringify(r, null, 2);
    }
});