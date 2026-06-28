# std::experimental::basic_string_view&lt;CharT,Traits&gt;::rbegin, std::experimental::basic_string_view&lt;CharT,Traits&gt;::crbegin

constexpr const_reverse_iterator rbegin() const noexcept; |  |  (library fundamentals TS)  
---|---|---
constexpr const_reverse_iterator crbegin() const noexcept; |  |  (library fundamentals TS)  

  
Retorna um reverse iterator para o primeiro caractere da view invertida. Ele corresponde ao último caractere da view não invertida.

### Parâmetros

(nenhum)

### Valor de retorno

`const_reverse_iterator` para o primeiro caractere

### Complexidade

Constante

### Veja também

[ rendcrend](<#/doc/experimental/basic_string_view/rend>) |  retorna um reverse iterator para o fim   
(função membro pública)  