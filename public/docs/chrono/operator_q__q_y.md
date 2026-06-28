# std::literals::chrono_literals::operator""y

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::year operator""y( unsigned long long y ) noexcept;
```

Forma um literal std::chrono::year representando um ano no [calendário gregoriano proléptico](<https://en.wikipedia.org/wiki/proleptic_Gregorian_calendar> "enwiki:proleptic Gregorian calendar").

### Parâmetros

- **y** — o valor do ano

### Valor de retorno

Um std::chrono::year inicializado a partir de int(y). Se y não estiver no intervalo `[`-32767`, `32767`]`, o valor armazenado é não especificado.

### Possível implementação
```cpp
    constexpr std::chrono::year operator""y(unsigned long long y) noexcept
    {
        return std::chrono::year(static_cast<int>(y));
    }
```

---

### Observações

Este operator é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operator pode ser obtido com:

  * using namespace std::literals,
  * using namespace std::chrono_literals, ou
  * using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva using namespace literals::chrono_literals; é fornecida pela [standard library](<#/doc/standard_library>), de modo que se um programador usar using namespace std::chrono; para obter acesso às classes na [chrono library](<#/doc/chrono>), os operators literais correspondentes também se tornam visíveis.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::literals;
    
        std::cout << int(2020y)  << '\t' << 2020y  << '\n'
                  << int(-220y)  << '\t' << -220y  << '\n'
                  << int(3000y)  << '\t' << 3000y  << '\n'
                  << int(32768y) << '\t' << 32768y << '\n'  // unspecified
                  << int(65578y) << '\t' << 65578y << '\n'; // unspecified
    }
```

Saída possível:
```
    2020	2020
    -220	-0220
    3000	3000
    -32768	-32768 is not a valid year
    42	0042
```

### Veja também

[ (construtor)](<#/doc/chrono/year/year>) | constrói um `year`
(função membro pública de `std::chrono::year`)