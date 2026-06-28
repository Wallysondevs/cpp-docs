# std::literals::chrono_literals::operator""ms

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::milliseconds
operator""ms( unsigned long long ms );
constexpr std::chrono::duration</*unspecified*/, std::milli>
operator""ms( long double ms );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) representando milissegundos.

1) Literal inteiro, retorna exatamente [std::chrono::milliseconds](<#/doc/chrono/duration>)(ms).

2) Literal de ponto flutuante, retorna uma duration de ponto flutuante equivalente a [std::chrono::milliseconds](<#/doc/chrono/duration>).

### Parâmetros

- **ms** — o número de milissegundos

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::milliseconds operator""ms(unsigned long long ms)
    {
        return std::chrono::milliseconds(ms);
    }
    constexpr std::chrono::duration<long double, std::milli> operator""ms(long double ms)
    {
        return std::chrono::duration<long double, std::milli>(ms);
    }
```

---

### Observações

Este operador é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operador pode ser obtido com:

  * using namespace std::literals,
  * using namespace std::chrono_literals, ou
  * using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva using namespace literals::chrono_literals; é fornecida pela [standard library](<#/doc/standard_library>), de modo que se um programador usar using namespace std::chrono; para obter acesso às classes na [chrono library](<#/doc/chrono>), os operadores literais correspondentes também se tornam visíveis.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono_literals;
        constexpr auto d1{250ms};
        constexpr std::chrono::milliseconds d2{1s};
        std::cout << d1 << " = " << d1.count() << " milliseconds\n"
                  << d2 << " = " << d2.count() << " milliseconds\n";
    }
```

Saída:
```
    250ms = 250 milliseconds
    1000ms = 1000 milliseconds
```

### Veja também

[ (construtor)](<#/doc/chrono/duration/duration>) | constrói uma nova duration
(função membro pública de `std::chrono::duration<Rep,Period>`)