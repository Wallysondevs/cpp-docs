# operator+(std::reverse_iterator)

Definido no cabeçalho `[<iterator>](<#/doc/header/iterator>)`

```c
template< class Iter >
reverse_iterator<Iter> operator+
( typename reverse_iterator<Iter>::difference_type n,
const reverse_iterator<Iter>& it );
(até C++23)
template< class Iter >
constexpr reverse_iterator<Iter> operator+
( std::iter_difference_t<Iter> n, const reverse_iterator<Iter>& it );
```

Retorna o iterator `it` incrementado por `n`. Na verdade, o iterator subjacente é decrementado por `n`.

### Parâmetros

- **n** — o número de posições para incrementar o iterator
- **it** — o adaptador de iterator a ser incrementado

### Valor de retorno

`reverse_iterator<Iter>(it.base() - n)`

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <iterator>
    #include <list>
    #include <vector>
    
    int main()
    {
        {
            std::vector v{0, 1, 2, 3};
            std::reverse_iterator<std::vector<int>::iterator>
                ri1{std::reverse_iterator{v.rbegin()}};
            std::cout << *ri1 << ' '; // 3
            std::reverse_iterator<std::vector<int>::iterator> ri2{2 + ri1};
            std::cout << *ri2 << ' '; // 1
        }
    
        {
            std::list l{5, 6, 7, 8};
            std::reverse_iterator<std::list<int>::iterator>
                ri1{std::reverse_iterator{l.rbegin()}};
            std::cout << *ri1 << '\n'; // 8
        //  auto ri2{2 + ri1}; // Erro: o iterator subjacente não
                               //        modela um iterator de acesso aleatório
        }
    }
```

Saída:
```
    3 1 8
```

### Veja também

[ operator++operator++(int)operator+=operator+operator--operator--(int)operator-=operator-](<#/doc/iterator/reverse_iterator/operator_arith>) | avança ou decrementa o iterator
(função membro pública)
[ operator-](<#/doc/iterator/reverse_iterator/operator->) | calcula a distância entre dois adaptadores de iterator
(template de função)