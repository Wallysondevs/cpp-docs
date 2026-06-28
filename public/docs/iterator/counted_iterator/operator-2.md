# operator-(std::counted_iterator&lt;I&gt;, std::default_sentinel_t)

```cpp
friend constexpr std::iter_difference_t<I> operator-(
const counted_iterator& x, std::default_sentinel_t );  // (1) (desde C++20)
friend constexpr std::iter_difference_t<I> operator-(
std::default_sentinel_t, const counted_iterator& y );  // (2) (desde C++20)
```

  
1) Retorna a distância negativa até o final.

2) Retorna a distância positiva até o final.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando std::counted_iterator&lt;I&gt; é uma classe associada dos argumentos. 

### Parâmetros

x, y  |  \-  |  adaptadores de iterator para calcular a diferença   
  
### Valor de retorno

1) -x.count()

2) y.count()

### Exemplo

Execute este código
```
    #include <initializer_list>
    #include <iterator>
     
    int main()
    {
        constexpr static auto v = {1, 2, 3, 4};
        constexpr std::counted_iterator<std::initializer_list<int>::iterator>
            it{v.begin(), 3};
        constexpr auto d1 = it - std::default_sentinel;
        static_assert(d1 == -3); // (1)
        constexpr auto d2 = std::default_sentinel - it;
        static_assert(d2 == +3); // (2)
    }
```

### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/counted_iterator/operator_arith>)(C++20) |  avança ou decrementa o iterator   
(função membro pública)  
[ operator+](<#/>)(C++20) |  avança o iterator   
(template de função)  
[ operator-](<#/doc/iterator/counted_iterator/operator->)(C++20) |  calcula a distância entre dois adaptadores de iterator   
(template de função)  
[ default_sentinel_t](<#/doc/iterator/default_sentinel>)(C++20) |  sentinel padrão para uso com iterators que conhecem o limite de seu range   
(classe)