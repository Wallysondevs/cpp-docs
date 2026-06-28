# operator==(std::counted_iterator&lt;I&gt;, std::default_sentinel_t)

```cpp
friend constexpr bool operator==(
const counted_iterator& x, std::default_sentinel_t );  // (desde C++20)
```

  
Verifica se o _comprimento_ subjacente (isto é, a distância até o final) é igual a 0.

Este modelo de função não é visível para lookup não qualificado comum ou lookup qualificado, e só pode ser encontrado por argument-dependent lookup quando std::counted_iterator&lt;I&gt; é uma classe associada dos argumentos.

O operador `!=` é sintetizado a partir de `operator==`.

### Parâmetros

x  |  \-  |  um adaptador de iterador   
  
### Valor de retorno

true se x.count() for igual a 0, false caso contrário.

### Exemplo

Execute este código
```cpp
    #include <initializer_list>
    #include <iterator>
     
    int main()
    {
        static constexpr auto v = {1, 2, 3, 4};
        constexpr std::counted_iterator<std::initializer_list<int>::iterator>
            it1{v.begin(), 3},
            it2{v.begin(), 0};
        static_assert(it1 != std::default_sentinel);
        static_assert(it2 == std::default_sentinel);
        static_assert(std::default_sentinel != it1);
        static_assert(std::default_sentinel == it2);
    }
```

### Veja também

[ operator==operator<=>](<#/doc/iterator/counted_iterator/operator_cmp>)(C++20) | compara as distâncias até o final   
(modelo de função)  