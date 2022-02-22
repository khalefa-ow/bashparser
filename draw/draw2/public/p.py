def CommandNode(id, label):
  str="{ id: \"%s\"\n"%(id)
  str=str+"   type: \"process\", \n"
  str=str+"   data: { label: \"%s\" },\n"%(label)
  str=str+"    position: { x: 250, y: 5 } \n"
  str=str+"  }"
  str=str.replace(r'\n','\n')
  return str

def ifnode(id, label):
    s="{ node%s: {\n     id: \"node%s\"," %(id,id)
    s=s+"\n     type: \"input-output\",\n"
    s=s+ " label: \"if %s\"" % (label)
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
    s=s.replace(r'\n','\n')
    return s

y=ifnode('dd','sa')    
x=CommandNode('das','ds')  
d=[]
d.append(x)
d.append(y)

for x in d:
	print(x)