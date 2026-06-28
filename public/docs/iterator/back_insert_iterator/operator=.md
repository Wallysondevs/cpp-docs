# std::back_insert_iterator&lt;Container&gt;::operator=

```cpp
  // (1)
back_insert_iterator<Container>&
operator=( typename Container::const_reference value ); |  | (ate C++11)
back_insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++11)
(ate C++20)
constexpr back_insert_iterator<Container>&
operator=( const typename Container::value_type& value );  // (desde C++20)
  // (2)
back_insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++11)
(ate C++20)
constexpr back_insert_iterator<Container>&
operator=( typename Container::value_type&& value );  // (desde C++20)
```

  
Insere o `value` fornecido no container.

1) Resulta em `container->push_back(value)`.

2) Resulta em `container->push_back(std::move(value))`.

### Parâmetros

value  |  \-  |  o valor a ser inserido   
  
### Valor de retorno

`*this`

### Exemplo

Execute este código
```cpp
    #include <deque>
    #include <iostream>
    #include <iterator>
     
    int main()
    {
        std::deque<int> q;
        std::back_insert_iterator<std::deque<int>> it(q);
     
        for (int i = 0; i < 10; ++i)
            it = i; // calls q.push_back(i)
     
        for (auto& elem : q)
            std::cout << elem << ' ';
        std::cout << '\n';
    }
```

Saída: 
```
    0 1 2 3 4 5 6 7 8 9
```