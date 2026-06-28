# Palavra-chave C++: break

### Uso

  * [`break` statement](<#/doc/language/break>): a instrução `break`

### Exemplo

Execute este código
```
    #include <iostream>
     
    int main() noexcept
    {
        for (int i{0}; i < 69; ++i)
        {
            if (i == 3) [[unlikely]]
                break; // breaks from the 'for' loop
            std::cout << i;
        }
    }
```

Saída: 
```
    012
```

### Veja também

  * [`if`](<#/doc/language/if>) instrução: [`if`](<#/doc/keywords/if>), [`else`](<#/doc/keyword/else>)

  * [`constexpr` `if` statement](<#/doc/language/if>): [`constexpr`](<#/doc/keyword/constexpr>) (instrução `constexpr` `if`)

| (desde C++17)  
  
  * [`consteval` `if` statement](<#/doc/language/if>): [`consteval`](<#/doc/keyword/consteval>) (instrução `consteval` `if`)

| (desde C++23)  
  
  * [`switch`](<#/doc/language/switch>) instrução: [`switch`](<#/doc/keyword/switch>), [`case`](<#/doc/keyword/case>)
  * [`default`](<#/doc/language/switch>) (como declaração de rótulo de case) etc: [`default`](<#/doc/keyword/default>)
  * [`goto`](<#/doc/language/goto>) instrução: [`goto`](<#/doc/keyword/goto>)
  * [`continue`](<#/doc/language/continue>) instrução: [`continue`](<#/doc/keyword/continue>)

  * [`return`](<#/doc/language/return>) instrução: [`return`](<#/doc/keyword/return>)

  * [`co_return`](<#/doc/language/return>) instrução (retorno de uma coroutine): [`co_return`](<#/doc/keyword/co_return>)

| (desde C++20)  
  
  * [`do-while`](<#/doc/language/do>) laço e [`while` loop](<#/doc/language/while>): [`do`](<#/doc/keyword/do>), [`while`](<#/doc/keyword/while>)
  * [`for`](<#/doc/language/for>) laço e [range-based `for` loop](<#/doc/language/range-for>): [`for`](<#/doc/keyword/for>)
