# std::insert_iterator&lt;Container&gt;::operator=

```cpp
  // (1)
insert_iterator<Container>&
operator=( typename Container::const_reference value ); |  | (ate C++11)
insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++11)
(ate C++20)
constexpr insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++20)
  // (2)
insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++11)
(ate C++20)
constexpr insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++20)
```

  
Insere o valor fornecido value no container.

1) Resulta em iter = container->insert(iter, value); ++iter;.

2) Resulta em iter = container->insert(iter, std::move(value)); ++iter;.

### Parâmetros

value  |  \-  |  o valor a ser inserido   
  
### Valor de retorno

*this

### Observações

Esta função explora a compatibilidade de assinatura entre a inserção com dica para containers associativos (como [std::set::insert](<#/doc/container/set/insert>)) e a inserção posicional para containers sequenciais (como [std::vector::insert](<#/doc/container/vector/insert>)).

### Exemplo

Execute este código
```cpp
    #include <deque>
    #include <iostream>
    #include <iterator>
    
    int main()
    {
        std::deque<int> q;
        std::insert_iterator<std::deque<int>> it(q, q.begin());
    
        for (int i = 0; i < 10; ++i)
            it = i; // insere i
    
        for (auto& elem : q)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    0 1 2 3 4 5 6 7 8 9
```