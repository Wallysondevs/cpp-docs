Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::microseconds
operator""us( unsigned long long us );
constexpr std::chrono::duration</*unspecified*/, std::micro>
operator""us( long double us );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) representando microssegundos.

1) Literal inteiro, retorna exatamente [std::chrono::microseconds](<#/doc/chrono/duration>)(us).

2) Literal de ponto flutuante, retorna uma duração de ponto flutuante equivalente a [std::chrono::microseconds](<#/doc/chrono/duration>).

### Parâmetros

- **us** — o número de microssegundos

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::microseconds operator""us(unsigned long long us)
    {
        return std::chrono::microseconds(us);
    }
    constexpr std::chrono::duration<long double, std::micro> operator""us(long double us)
    {
        return std::chrono::duration<long double, std::micro>(us);
    }
```

---

### Notas

Este operator é declarado no namespace std::literals::chrono_literals, onde ambos literals e chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operator pode ser obtido com:

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
        auto d1 = 250us;
        std::chrono::microseconds d2 = 1ms;
        std::cout << d1 << " = " << d1.count() << " microseconds\n"
                  << 1ms << " = " << d2.count() << " microseconds\n";
    }
```

Saída:
```
    250us = 250 microseconds
    1ms = 1000 microseconds
```

### Veja também

[ (constructor)](<#/doc/chrono/duration/duration>) | constrói uma nova duração
(função membro pública de `std::chrono::duration<Rep,Period>`)