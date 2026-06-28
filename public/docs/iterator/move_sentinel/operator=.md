# std::move_sentinel&lt;S&gt;::operator=

```cpp
template< class S2 >
requires std::assignable_from<S&, const S2&>
constexpr move_sentinel& operator=( const std::move_sentinel<S2>& other );  // (desde C++20)
```

  
O sentinel subjacente recebe o valor do sentinel subjacente de other, isto é, other.base().

### Parâmetros

other  |  \-  |  adaptador de sentinel para atribuir   
  
### Valor de retorno

*this

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator=](<#/>)(C++11) |  atribui outro adaptador de iterator   
(função membro pública de `std::move_iterator<Iter>`)  