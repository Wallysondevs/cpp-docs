# std::chrono::day::operator unsigned

```cpp
constexpr explicit operator unsigned() const noexcept;  // (desde C++20)
```

  
Retorna o valor do dia armazenado em *this. 

### Return value

O valor do dia armazenado em *this. 

### Example

Execute este código
```
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::day d{15};
        constexpr unsigned day = static_cast<unsigned>(d);
        std::cout << "The day is: " << day << '\n';
    }
```

Saída: 
```
    The day is: 15
```