# operator+(std::counted_iterator)

```cpp
friend constexpr counted_iterator operator+(
std::iter_difference_t<I> n, const counted_iterator& x )
requires std::random_access_iterator<I>;  // (desde C++20)
```

  
Retorna um adaptador de iterator que é avançado por n. O comportamento é indefinido se n for maior que o comprimento registrado em x (ou seja, se x + n resultar em comportamento indefinido). 

Esta função não é visível para [lookup não qualificado](<#/doc/language/unqualified_lookup>) ou [lookup qualificado](<#/doc/language/qualified_lookup>) comum, e só pode ser encontrada por [argument-dependent lookup](<#/doc/language/adl>) quando std::counted_iterator&lt;I&gt; é uma classe associada dos argumentos. 

### Parâmetros

n  |  \-  |  o número de posições para incrementar o iterator   
---|---|---
x  |  \-  |  o adaptador de iterator a ser incrementado   
  
### Valor de retorno

Um adaptador de iterator igual a x + n. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
     
    int main()
    {
        std::vector v{0, 1, 2, 3, 4, 5};
        std::counted_iterator<std::vector<int>::iterator> p{v.begin() + 1, 4};
        std::cout << "*p:" << *p << ", count:" << p.count() << '\n';
        std::counted_iterator<std::vector<int>::iterator> q{2 + p};
        std::cout << "*q:" << *q << ", count:" << q.count() << '\n';
     
        std::list l{6, 7, 8, 9};
        std::counted_iterator<std::list<int>::iterator> r{l.begin(), 3};
        std::cout << "*r:" << *r << ", count:" << r.count() << '\n';
    //  auto s{2 + r}; // error: the underlying iterator does
                       // not model std::random_access_iterator
    }
```

Saída: 
```
    *p:1, count:4
    *q:3, count:2
    *r:6, count:3
```

### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/counted_iterator/operator_arith>)(desde C++20) | avança ou decrementa o iterator   
(função membro pública)  
[ operator-](<#/doc/iterator/counted_iterator/operator->)(desde C++20) | calcula a distância entre dois adaptadores de iterator   
(modelo de função)  
[ operator-(std::default_sentinel_t)](<#/doc/iterator/counted_iterator/operator-2>)(desde C++20) | calcula a distância com sinal até o final   
(modelo de função)