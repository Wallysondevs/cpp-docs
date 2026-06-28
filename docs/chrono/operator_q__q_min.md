# std::literals::chrono_literals::operator""min

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr chrono::minutes
operator""min( unsigned long long mins );
constexpr chrono::duration</*unspecified*/, ratio<60,1>>
operator""min( long double mins );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) que representa minutos.

1) Literal inteiro, retorna exatamente [std::chrono::minutes](<#/doc/chrono/duration>)(mins).

2) Literal de ponto flutuante, retorna uma duration de ponto flutuante equivalente a [std::chrono::minutes](<#/doc/chrono/duration>).

### Parâmetros

- **mins** — o número de minutos

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::minutes operator""min(unsigned long long m)
    {
        return std::chrono::minutes(m);
    }
    constexpr std::chrono::duration<long double,
                                    std::ratio<60,1>> operator""min(long double m)
    {
        return std::chrono::duration<long double, ratio<60,1>> (m);
    }
```

---

### Notas

Este operador é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operador pode ser obtido com:

*   using namespace std::literals,
*   using namespace std::chrono_literals, ou
*   using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva `using namespace literals::chrono_literals;` é fornecida pela [standard library](<#/doc/standard_library>), de modo que se um programador usar `using namespace std::chrono;` para obter acesso às classes na [chrono library](<#/doc/chrono>), os operadores literais correspondentes também se tornam visíveis.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono_literals;
        auto lesson = 45min;
        auto halfmin = 0.5min;
        std::cout << "One lesson is " << lesson.count() << " minutes"
                     " (" << lesson << ")\n"
                  << "Half a minute is " << halfmin.count() << " minutes"
                     " (" << halfmin << ")\n";
    }
```

Saída:
```
    One lesson is 45 minutes (45min)
    Half a minute is 0.5 minutes (0.5min)
```

### Veja também

[ (construtor)](<#/doc/chrono/duration/duration>) | constrói uma nova duration
(função membro pública de `std::chrono::duration<Rep,Period>`)