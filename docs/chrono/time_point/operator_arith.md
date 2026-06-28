# std::chrono::time_point&lt;Clock,Duration&gt;::operator+=, operator-=

```cpp
time_point& operator+=( const duration& d );  // (1) (desde C++11)
(constexpr desde C++17)
time_point& operator-=( const duration& d );  // (2) (desde C++11)
(constexpr desde C++17)
```

  
Modifica o time point pela duração fornecida.

1) Aplica o offset d a `pt`. Efetivamente, d é adicionado à duração `_d__` armazenada internamente como d_ += d.

2) Aplica o offset d a `pt` na direção negativa. Efetivamente, d é subtraído da duração `_d__` armazenada internamente como d_ -= d.

### Parâmetros

d  |  \-  |  um offset de tempo a ser aplicado   
  
### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator+operator-](<#/doc/chrono/time_point/operator_arith2>)(C++11) | realiza operações de adição e subtração envolvendo um time point   
(function template)  