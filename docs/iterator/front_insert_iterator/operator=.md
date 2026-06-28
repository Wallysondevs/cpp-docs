# std::front_insert_iterator&lt;Container&gt;::operator=

```cpp
  // (1)
front_insert_iterator<Container>&
operator=( typename Container::const_reference value );  // (até C++11)
front_insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++11)
(até C++20)
constexpr front_insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++20)
  // (2)
front_insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++11)
(até C++20)
constexpr front_insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++20)
```

  
Insere o valor fornecido value no container.

1) Resulta em container->push_front(value).

2) Resulta em container->push_front(std::move(value)).

### Parâmetros

value  |  \-  |  o valor a ser inserido   
  
### Valor de retorno

*this

### Exemplo

Execute este código
```
    #include <deque>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        std::deque<int> q;
        std::front_insert_iterator<std::deque<int>> it(q);
     
        for (int i = 0; i < 10; ++i)
            it = i; // calls q.push_front(i)
     
        for (auto& elem : q)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    9 8 7 6 5 4 3 2 1 0
```