# std::basic_const_iterator&lt;Iter&gt;::operator[]

```cpp
constexpr std::iter_const_reference_t<Iter> operator const
requires std::random_access_iterator<Iterator>;  // (desde C++23)
```

  
Retorna uma referência para o elemento na localização relativa especificada.

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

Uma referência-para-const para o elemento na localização relativa, isto é, static_cast<[std::iter_const_reference_t](<#/doc/iterator/iter_t>)&lt;Iter&gt;>(base()[n]).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ operator*operator->](<#/doc/iterator/basic_const_iterator/operator_star_>) | acessa o elemento apontado   
(função membro pública)  