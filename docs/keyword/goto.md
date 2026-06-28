# Palavra-chave C++: goto

### Uso

  * Declaração [`goto`](<#/doc/language/goto>): como a declaração da instrução

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <string>
    
    [[nodiscard]] auto get_first_line(const std::string& string)
    {
        std::string first_line{};
        for (const auto character : string)
            switch (character)
            {
                case '\n':
                    goto past_for; // sai do 'loop range-for'
                default:
                    first_line += character;
                    break;
            }
    past_for:
        return first_line;
    }
    
    int main()
    {
        assert(get_first_line("Hello\nworld!") == "Hello");
    }
```

### Veja também

  * Instrução [`if`](<#/doc/language/if>): [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * Instrução [`constexpr` `if`](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)
  
  * Instrução [`consteval` `if`](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)
  
  * Instrução [`switch`](<#/doc/language/switch>): [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de caso) etc: [`default`](<#/doc/keyword/default>)

  * Instrução [`continue`](<#/doc/language/continue>): [`continue`](<#/doc/keyword/continue>)
  * Instrução [`break`](<#/doc/language/break>): [`break`](<#/doc/keyword/break>)
  * Instrução [`return`](<#/doc/language/return>): [`return`](<#/doc/keyword/return>)

  * Instrução [`co_return`](<#/doc/language/return>) (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)
  
  * Loop [`do-while`](<#/doc/language/do>) e loop [`while`](<#/doc/language/while>): [`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)
  * Loop [`for`](<#/doc/language/for>) e [loop `for` baseado em range](<#/doc/language/range-for>): [`for`](<#/doc/keyword/for>)
