# std::basic_regex&lt;CharT,Traits&gt;::getloc

locale_type getloc() const; |  |  (desde C++11)  

  
Retorna o locale atual associado à expressão regular.

Efetivamente chama `traits_i.getloc()` onde `traits_i` é uma instância inicializada por padrão do tipo `Traits`, armazenada dentro do objeto da expressão regular.

### Parâmetros

(nenhum)

### Valor de retorno

O locale atual associado à expressão regular.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ imbue](<#/doc/regex/basic_regex/imbue>) | define informações de locale   
(função membro pública)  