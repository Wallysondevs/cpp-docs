# C++ keyword: continue

### Uso

  * [`continue` statement](<#/doc/language/continue>): como a declaração da instrução

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    [[nodiscard]] constexpr auto get_digits(const std::string& string) noexcept
    {
        std::string digits{};
     
        for (const auto& character: string)
        {
            if (character < '0' || character > '9') [[likely]]
                continue; // pula condicionalmente a instrução seguinte
            digits += character;
        }
     
        return digits;
    }
     
    int main() noexcept
    {
        std::cout << get_digits("H3LL0, W0RLD!");
    }
```

Saída:
```
    300
```

### Veja também

  * Instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * Instrução [`constexpr` `if`](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)
  
  * Instrução [`consteval` `if`](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)
  
  * Instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de case) etc: [`default`](<#/doc/keyword/default>)
  * Instrução [`goto`](<#/doc/language/goto>): [`goto`](<#/doc/keyword/goto>)

  * Instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)
  * Instrução [`return`](<#/doc/language/return>): [`return`](<#/doc/keyword/return>)

  * Instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)
  
  * Loop [`do-while`](<#/doc/language/do>) e loop [`while`](<#/doc/language/while>): [`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)
  * Loop [`for`](<#/doc/language/for>) e [loop `for` baseado em range](<#/doc/language/range-for>): [`for`](<#/doc/keyword/for>)
