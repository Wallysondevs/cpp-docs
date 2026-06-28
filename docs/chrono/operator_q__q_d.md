# std::literals::chrono_literals::operator""d

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::day operator ""d( unsigned long long d ) noexcept;
```

Forma um literal std::chrono::day representando um dia do mês no calendário.

### Parâmetros

- **d** — o valor do dia

### Valor de retorno

Um std::chrono::day armazenando d. Se d > 255, o valor armazenado é não especificado.

### Implementação possível
```cpp
    constexpr std::chrono::day operator ""d(unsigned long long d) noexcept
    {
        return std::chrono::day(d);
    }
```

---

### Notas

Este operador é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operador pode ser obtido com:

  * using namespace std::literals,
  * using namespace std::chrono_literals, ou
  * using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva using namespace literals::chrono_literals; é fornecida pela [standard library](<#/doc/standard_library>), de modo que se um programador usa using namespace std::chrono; para obter acesso às classes na [chrono library](<#/doc/chrono>), os operadores literais correspondentes também se tornam visíveis.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::literals::chrono_literals;
     
        std::cout << static_cast<unsigned>(42d) << '\t' << 42d << '\n'
                  << static_cast<unsigned>(256d) << '\t' << 256d << '\n' // unspecified
                  << static_cast<unsigned>(298d) << '\t' << 298d << '\n'; // unspecified
    }
```

Saída possível:
```
    42      42 is not a valid day
    0       00 is not a valid day
    42      42 is not a valid day
```

### Veja também

[ (construtor)](<#/doc/chrono/day/day>) | constrói um `day`
(função membro pública de `std::chrono::day`)
[ operator unsigned](<#/doc/chrono/day/operator_unsigned>) | recupera o valor do dia armazenado
(função membro pública de `std::chrono::day`)