# std::basic_filebuf&lt;CharT,Traits&gt;::~basic_filebuf

virtual ~basic_filebuf();

  
Chama [close()](<#/doc/io/basic_filebuf/close>) para fechar o arquivo associado e destrói todos os outros membros de `basic_filebuf`. Se uma exceção ocorrer durante a destruição do objeto, incluindo a chamada para [close()](<#/doc/io/basic_filebuf/close>), ela é capturada e não relançada. 

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Notas

Tipicamente chamado pelo destrutor de [std::basic_fstream](<#/doc/io/basic_fstream>). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 622](<https://cplusplus.github.io/LWG/issue622>) | C++98  | não estava claro como lidar com a exceção lançada durante a destruição  | ela é capturada mas não relançada   
  
### Veja também

[ (constructor)](<#/doc/io/basic_filebuf/basic_filebuf>) | constrói um objeto `basic_filebuf`   
(função membro pública)  
[ close](<#/doc/io/basic_filebuf/close>) | descarrega o buffer da área de escrita e fecha o arquivo associado   
(função membro pública)