# std::experimental::basic_string_view&lt;CharT,Traits&gt;::end, std::experimental::basic_string_view&lt;CharT,Traits&gt;::cend

constexpr const_iterator end() const noexcept; |  |  (library fundamentals TS)  
---|---|---
constexpr const_iterator cend() const noexcept; |  |  (library fundamentals TS)  

  
Retorna um iterator para o caractere que segue o último caractere da view. Este caractere atua como um marcador de posição, tentar acessá-lo resulta em comportamento indefinido.

### Parâmetros

(nenhum)

### Valor de retorno

`const_iterator` para o caractere que segue o último caractere.

### Complexidade

Constante

### Ver também

[ begincbegin](<#/doc/experimental/basic_string_view/begin>) |  retorna um iterator para o início   
(função membro pública)  