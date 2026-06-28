# std::basic_ofstream&lt;CharT,Traits&gt;::is_open

bool is_open() const;

  
Verifica se o stream de arquivo possui um arquivo associado.

Efetivamente chama [`rdbuf()->is_open()`](<#/doc/io/basic_filebuf/is_open>). 

### Parâmetros

(nenhum) 

### Valor de retorno

`true` se o stream de arquivo possui um arquivo associado, `false` caso contrário. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 365](<https://cplusplus.github.io/LWG/issue365>) | C++98  | `is_open` não foi declarado com qualificador `const`  | declarado com qualificador `const`   
  
### Veja também

[ open](<#/doc/io/basic_ofstream/open>) |  abre um arquivo e o associa ao stream   
(função membro pública)  
[ close](<#/doc/io/basic_ofstream/close>) |  fecha o arquivo associado   
(função membro pública)