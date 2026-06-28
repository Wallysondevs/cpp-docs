# std::regex_traits&lt;CharT&gt;::getloc

locale_type getloc() const; |  |  (desde C++11)  

  
Retorna o locale atual do objeto traits.

Se [imbue()](<#/doc/regex/regex_traits/imbue>) nunca foi chamado para este objeto, então o locale global no momento da chamada é retornado. Caso contrário, o locale passado para a última chamada de [imbue()](<#/doc/regex/regex_traits/imbue>) é retornado.

### Parâmetros

(nenhum)

### Valor de retorno

O locale atual do objeto traits.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ imbue](<#/doc/regex/regex_traits/imbue>) | define o locale   
(função membro pública)  