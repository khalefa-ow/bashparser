import json

def ifnode(id):
    s="{ node%d: {\n     id: \"node%d\"," %(id,id)
    s=s+"\n     type: \"input-output\",\n"
    s=s+ "     ports: {\n"
    s=s+"        port1:{\n"
    s=s+"       "+"type: \"output\", \n"
    s=s+"        "+"properties: {\n"
    s=s+"            "+"value:  \"yes\"\n"
    s=s+"          } \n"
    s=s+"        } \n"
    s=s+"     } \n"
    s=s+"   } \n"
    s=s+"  } \n"
    s=s+"\n"
    return s

def visit(o, parent=nil):
    isArray=type(o)==list
    isObject=type(o)==dict
    type_= o['type']
    if(type=='script' | type =="CompoundList" | type== "pipeline"):
        return visit(o['commands'], parent);
    if isArray:
        prev=parent
        for i in range(len(o)):
            p=o[i]
            current=visit(p, prev)
            prev=current
        return prev
    if type_='If':
            then_clause=None
            else_clause=None
            d=[]
            if 'then' in o:
                then_clause=o['then']
            if 'else' in o:
                else_clause=o['else']
            d.append()


with open('terad-output.json', 'r') as f:
  data = json.load(f)
