# operator==,&lt;=&gt;(std::counted_iterator)

```cpp
template< std::common_with<I> I2 >
friend constexpr bool operator==(
const counted_iterator& x, const counted_iterator<I2>& y );  // (1) (desde C++20)
template< std::common_with<I> I2 >
friend constexpr strong_ordering operator<=>(
const counted_iterator& x, const counted_iterator<I2>& y );  // (2) (desde C++20)
```

  
Compara os comprimentos subjacentes (isto é, distâncias até o final).

1) Verifica se os comprimentos subjacentes são iguais.

2) Compara os comprimentos subjacentes com o operador `<=>`.

O comportamento é indefinido se x e y não apontarem para elementos da mesma sequência. Ou seja, deve existir algum n tal que [std::next](<#/doc/iterator/next>)(x.base(), x.count() + n) e [std::next](<#/doc/iterator/next>)(y.base(), y.count() + n) se refiram ao mesmo elemento.

Os operadores `<`, `<=`, `>`, `>=`, e `!=` são [sintetizados](<#/doc/language/operators>) a partir de `operator<=>` e `operator==` respectivamente.

Este modelo de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) comum ou [lookup qualificado](<#/doc/language/qualified_lookup>), e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando `std::counted_iterator<I>` é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  adaptadores de iterator   
  
### Valor de retorno

1) x.count() == y.count()

2) y.count() <=> x.count()

### Notas

Como o _comprimento_ conta para baixo, e não para cima, a ordem dos argumentos de `operator<=>` na expressão de comparação subjacente é invertida, ou seja, y é _lhs_, x é _rhs_.

### Exemplo

Execute este código
```cpp
    #include <initializer_list>
    #include <iterator>
     
    int main()
    {
        static constexpr auto v = {1, 2, 3, 4, 5, 6};
        constexpr std::counted_iterator<std::initializer_list<int>::iterator>
            it1{v.begin(), 5},
            it2{v.begin(), 5},
            it3{v.begin() + 1, 4},
            it4{v.begin(), 0};
        static_assert(it1 == it2);
        static_assert(it2 != it3);
        static_assert(it2 <  it3);
        static_assert(it1 <= it2);
        static_assert(it3 != std::default_sentinel);
        static_assert(it4 == std::default_sentinel);
     
    //  it2 == std::counted_iterator{v.begin(), 4}; // Comportamento Indefinido: operandos não se referem a
                                                    // elementos da mesma sequência
    }
```

### Veja também

[ operator==(std::default_sentinel)](<#/doc/iterator/counted_iterator/operator_cmp2>)(C++20) | verifica se a distância até o final é igual a `0`   
(modelo de função)  
[ operator+](<#/>)(C++20) | avança o iterator   
(modelo de função)  
[ operator-](<#/doc/iterator/counted_iterator/operator->)(C++20) | calcula a distância entre dois adaptadores de iterator   
(modelo de função)