# std::experimental::basic_string_view&lt;CharT,Traits&gt;::rend, std::experimental::basic_string_view&lt;CharT,Traits&gt;::crend

constexpr const_reverse_iterator rend() const noexcept; |  |  (library fundamentals TS)  
---|---|---
constexpr const_reverse_iterator crend() const noexcept; |  |  (library fundamentals TS)  

  
Retorna um reverse iterator para o caractere que segue o último caractere da view invertida. Corresponde ao caractere que precede o primeiro caractere da view não invertida. Este caractere atua como um placeholder, e tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum) 

### Valor de retorno

`const_reverse_iterator` para o caractere que segue o último caractere. 

### Complexidade

Constante 

### Veja também

[ rbegincrbegin](<#/doc/experimental/basic_string_view/rbegin>) |  retorna um reverse iterator para o início   
(função membro pública)  