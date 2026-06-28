# std::inplace_vector&lt;T,N&gt;::clear

```cpp
constexpr void clear() noexcept;  // (desde C++26)
```

  
Apaga todos os elementos do container. Após esta chamada, size() retorna zero. 

Invalida quaisquer referências, ponteiros e iteradores que se refiram a elementos contidos. Quaisquer iteradores past-the-end também são invalidados. 

### Parameters

(none) 

### Return value

(none) 

### Complexity

Linear no tamanho do container, ou seja, no número de elementos. 

### Example

Execute este código
```
    #include <iostream>
    #include <string_view>
    #include <inplace_vector>
     
    void print_info(std::string_view rem, const std::inplace_vector<int, 3>& v)
    {
        std::cout << rem << "{ ";
        for (const auto& value : v)
            std::cout << value << ' ';
        std::cout << "}\n";
        std::cout << "Size=" << v.size() << '\n';
    }
     
    int main()
    {
        std::inplace_vector<int, 3> container{1, 2, 3};
        print_info("Before clear: ", container);
        container.clear();
        print_info("After clear: ", container);
    }
```

Output: 
```
    Before clear: { 1 2 3 }
    Size=3
    After clear: { }
    Size=0
```

### See also

[ erase](<#/doc/container/inplace_vector/erase>) |  apaga elementos   
(função membro pública)  