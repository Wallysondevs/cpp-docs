# operator-(std::counted_iterator)

```cpp
template< std::common_with<I> I2 >
friend constexpr std::iter_difference_t<I2> operator-(
const counted_iterator& x, const counted_iterator<I2>& y );  // (desde C++20)
```

  
Calcula a distância entre dois adaptadores de iterador.

O comportamento é indefinido se x e y não apontarem para elementos da mesma sequência. Ou seja, deve existir algum n tal que [std::next](<#/doc/iterator/next>)(x.base(), x.count() + n) e [std::next](<#/doc/iterator/next>)(y.base(), y.count() + n) se refiram ao mesmo elemento.

Este template de função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrado por [argument-dependent lookup](<#/doc/language/adl>) quando std::counted_iterator&lt;I&gt; é uma classe associada dos argumentos.

### Parâmetros

x, y  |  \-  |  adaptadores de iterador para calcular a diferença   
  
### Valor de retorno

y.count() - x.count()

### Notas

Como a _contagem_ de comprimento diminui, e não aumenta, a ordem dos argumentos de operator- na expressão subjacente é invertida, ou seja, y é o _lhs_ e x é o _rhs_.

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
            it2{it1 + 3},
            it3{v.begin(), 2};
     
        static_assert(it1 - it2 == -3);
        static_assert(it2 - it1 == +3);
    //  static_assert(it1 - it3 == -3); // Comportamento Indefinido: operandos de operator- não se referem a
                                        // elementos da mesma sequência
    }
```

### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/counted_iterator/operator_arith>)(C++20) |  avança ou decrementa o iterador   
(função membro pública)  
[ operator+](<#/>)(C++20) |  avança o iterador   
(template de função)  
[ operator-(std::default_sentinel_t)](<#/doc/iterator/counted_iterator/operator-2>)(C++20) |  calcula a distância com sinal até o final   
(template de função)