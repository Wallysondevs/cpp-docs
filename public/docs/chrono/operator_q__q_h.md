# std::literals::chrono_literals::operator""h

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::hours
operator""h( unsigned long long hrs );
constexpr std::chrono::duration</*unspecified*/, std::ratio<3600,1>>
operator""h( long double hrs );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) que representa horas.

1) Literal inteiro, retorna exatamente [std::chrono::hours](<#/doc/chrono/duration>)(hrs).

2) Literal de ponto flutuante, retorna uma duration de ponto flutuante equivalente a [std::chrono::hours](<#/doc/chrono/duration>).

### Parâmetros

- **hrs** — o número de horas

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::hours operator""h(unsigned long long h)
    {
        return std::chrono::hours(h);
    }
     
    constexpr std::chrono::duration<long double, ratio<3600,1>> operator""h(long double h)
    {
        return std::chrono::duration<long double, std::ratio<3600,1>>(h);
    }
```

---

### Notas

Este operador é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operador pode ser obtido com:

*   using namespace std::literals,
*   using namespace std::chrono_literals, ou
*   using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva using namespace literals::chrono_literals; é fornecida pela [standard library](<#/doc/standard_library>), de modo que, se um programador usar using namespace std::chrono; para obter acesso às classes na [chrono library](<#/doc/chrono>), os operadores literais correspondentes também se tornam visíveis.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        using namespace std::chrono_literals;
        auto day = 24h;
        auto halfhour = 0.5h;
        std::cout << "one day is " << day.count() << " hours (" << day << ")\n"
                  << "half an hour is " << halfhour.count() << " hours ("
                  << halfhour << ")\n";
    }
```

Saída:
```
    one day is 24 hours (24h)
    half an hour is 0.5 hours (0.5h)
```

### Veja também

[ (constructor)](<#/doc/chrono/duration/duration>) | constrói uma nova duration
(função membro pública de `std::chrono::duration<Rep,Period>`)