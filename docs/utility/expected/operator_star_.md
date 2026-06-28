# std::expected&lt;T,E&gt;::operator-&gt;, std::expected&lt;T,E&gt;::operator*

```cpp
Modelo primário
constexpr const T* operator->() const noexcept;  // (1) (desde C++23)
constexpr T* operator->() noexcept;  // (2) (desde C++23)
constexpr const T& operator*() const& noexcept;  // (3) (desde C++23)
constexpr T& operator*() & noexcept;  // (4) (desde C++23)
constexpr const T&& operator*() const&& noexcept;  // (5) (desde C++23)
constexpr T&& operator*() && noexcept;  // (6) (desde C++23)
especialização parcial void
constexpr void operator*() const noexcept;  // (7) (desde C++23)
```

  
Acessa o valor esperado contido em *this.

1,2) Retorna um ponteiro para o valor esperado.

3-6) Retorna uma referência para o valor esperado.

7) Não retorna nada.

Se [`has_value()`](<#/doc/utility/expected/operator_bool>) for falso, o comportamento é indefinido. 

### Valor de retorno

1,2) [std::addressof](<#/doc/memory/addressof>)([`_val_`](<#/doc/utility/expected>))

3,4) `_val_`

5,6) std::[`move`](<#/doc/utility/move>)(`_val_`)

### Observações

Esses operadores não verificam se o optional representa um valor esperado! Você pode fazer isso manualmente usando [`has_value()`](<#/doc/utility/expected/operator_bool>) ou simplesmente [`operator bool()`](<#/doc/utility/expected/operator_bool>). Alternativamente, se o acesso verificado for necessário, [`value()`](<#/doc/utility/expected/value>) ou [`value_or()`](<#/doc/utility/expected/value_or>) podem ser usados. 

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <expected>
    #include <iomanip>
    #include <iostream>
    #include <string>
    
    int main()
    {
        using namespace std::string_literals;
    
        std::expected<int, std::string> ex1 = 6;
        assert(*ex1 == 6);
    
        *ex1 = 9;
        assert(*ex1 == 9);
    
        // *ex1 = "error"s; // error, ex1 contains an expected value of type int
        ex1 = std::unexpected("error"s);
        // *ex1 = 13; // UB, ex1 contains an unexpected value
        assert(ex1.value_or(42) == 42);
    
        std::expected<std::string, bool> ex2 = "Moon"s;
        std::cout << "ex2: " << std::quoted(*ex2) << ", size: " << ex2->size() << '\n';
    
        // You can "take" the expected value by calling operator* on an std::expected rvalue
    
        auto taken = *std::move(ex2);
        std::cout << "taken " << std::quoted(taken) << "\n"
                     "ex2: " << std::quoted(*ex2) << ", size: " << ex2->size() << '\n';
    }
```

Saída possível: 
```
    ex2: "Moon", size: 4
    taken "Moon"
    ex2: "", size: 0
```

### Veja também

[ value](<#/doc/utility/expected/value>) | retorna o valor esperado   
(função membro pública)  
[ value_or](<#/doc/utility/expected/value_or>) | retorna o valor esperado se presente, outro valor caso contrário   
(função membro pública)  
[ operator boolhas_value](<#/doc/utility/expected/operator_bool>) | verifica se o objeto contém um valor esperado   
(função membro pública)  
[ error](<#/doc/utility/expected/error>) | retorna o valor inesperado   
(função membro pública)