# std::reverse_iterator&lt;Iter&gt;::base

iterator_type base() const; |  | (constexpr desde C++17)  

  
Retorna o iterator subjacente. 

### Valor de retorno

`[current](<#/doc/iterator/reverse_iterator>)`

### Observações

O iterator base se refere ao elemento que é o próximo (da perspectiva do `iterator_type`) ao elemento para o qual o `reverse_iterator` está atualmente apontando. Ou seja, &*(this->base() - 1) == &*(*this). 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <iterator>
    #include <vector>
     
    int main()
    {
        std::vector<int> v = {0, 1, 2, 3, 4, 5};
     
        using RevIt = std::reverse_iterator<std::vector<int>::iterator>;
     
        const auto it = v.begin() + 3;
        RevIt r_it{it};
     
        std::cout << "*it == " << *it << '\n'
                  << "*r_it == " << *r_it << '\n'
                  << "*r_it.base() == " << *r_it.base() << '\n'
                  << "*(r_it.base() - 1) == " << *(r_it.base() - 1) << '\n';
     
        RevIt r_end{v.begin()};
        RevIt r_begin{v.end()};
     
        for (auto it = r_end.base(); it != r_begin.base(); ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
     
        for (auto it = r_begin; it != r_end; ++it)
            std::cout << *it << ' ';
        std::cout << '\n';
    }
```

Output: 
```
    *it == 3
    *r_it == 2
    *r_it.base() == 3
    *(r_it.base() - 1) == 2
    0 1 2 3 4 5
    5 4 3 2 1 0
```

### Ver também

[ operator*operator->](<#/doc/iterator/reverse_iterator/operator_star_>) | acessa o elemento apontado   
(função membro pública)  