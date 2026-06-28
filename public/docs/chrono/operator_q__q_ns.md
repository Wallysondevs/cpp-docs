# std::literals::chrono_literals::operator""ns

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::nanoseconds
operator""ns( unsigned long long nsec );
constexpr std::chrono::duration</*unspecified*/, std::nano>
operator""ns( long double nsec );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) representando nanossegundos.

1) Literal inteiro, retorna exatamente [std::chrono::nanoseconds](<#/doc/chrono/duration>)(nsec).

2) Literal de ponto flutuante, retorna uma duration de ponto flutuante equivalente a [std::chrono::nanoseconds](<#/doc/chrono/duration>).

### Parâmetros

- **nsec** — o número de nanossegundos

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::nanoseconds operator""ns(unsigned long long ns)
    {
        return std::chrono::nanoseconds(ns);
    }
    constexpr std::chrono::duration<long double, std::nano> operator""ns(long double ns)
    {
        return std::chrono::duration<long double, std::nano>(ns);
    }
```

---

### Notas

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
        auto d1{250ns};
        std::chrono::nanoseconds d2{1us};
        std::cout << d1 << " = " << d1.count() << " nanoseconds\n"
                  << d2 << " = " << d2.count() << " nanoseconds\n";
    }
```

Saída:
```
    250ns = 250 nanoseconds
    1000ns = 1000 nanoseconds
```

### Veja também

[ (constructor)](<#/doc/chrono/duration/duration>) | constrói uma nova duration
(função membro pública de `std::chrono::duration<Rep,Period>`)