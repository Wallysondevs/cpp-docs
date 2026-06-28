# operator+, operator-(std::basic_const_iterator)

```cpp
friend constexpr basic_const_iterator
operator+( const basic_const_iterator& i, difference_type n )
requires std::random_access_iterator<Iter>;  // (1) (desde C++23)
friend constexpr basic_const_iterator
operator+( difference_type n, const basic_const_iterator& i )
requires std::random_access_iterator<Iter>;  // (2) (desde C++23)
friend constexpr basic_const_iterator
operator-( const basic_const_iterator& i, difference_type n )
requires std::random_access_iterator<Iter>;  // (3) (desde C++23)
```

  
Retorna o iterator `i` incrementado ou decrementado por `n`.

1,2) Retorna um iterator que é avançado em `n` posições.

3) Retorna um iterator que é avançado em `-n` posições.

Estas funções não são visíveis para lookup não qualificado ou qualificado comum, e só podem ser encontradas por [argument-dependent lookup](<#/doc/language/adl>) quando [std::basic_const_iterator](<#/doc/iterator/basic_const_iterator>)&lt;Iter&gt; é uma classe associada dos argumentos.

### Valor de retorno

1,2) basic_const_iterator(i.base() + n)

3) basic_const_iterator(i.base() - n)

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   