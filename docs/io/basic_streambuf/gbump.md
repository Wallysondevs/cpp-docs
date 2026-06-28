# std::basic_streambuf&lt;CharT,Traits&gt;::gbump

protected:  
void gbump( int count );

  
Pula `count` caracteres na `get area`. Isso é feito adicionando `count` ao `get pointer`. Nenhuma verificação de `underflow` é realizada.

### Parâmetros

count  |  \-  |  número de caracteres a pular   
  
### Valor de retorno

(nenhum) 

### Observações

Como esta função aceita um `int`, ela não pode manipular buffers maiores que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;int&gt;::max() caracteres ([LWG issue 255](<https://cplusplus.github.io/LWG/issue255>)). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 59](<https://cplusplus.github.io/LWG/issue59>) | C++98  | não estava claro se `gbump` poderia ser implementado  
chamando [`sbumpc`](<#/doc/io/basic_streambuf/sbumpc>) `count` vezes (o que pode verificar `underflow`)  | apenas adicionar `count`  
ao `get pointer`   
  
### Ver também

[ pbump](<#/doc/io/basic_streambuf/pbump>) | avança o próximo ponteiro da sequência de saída   
(função membro protegida)  