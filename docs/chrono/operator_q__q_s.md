# std::literals::chrono_literals::operator""s

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr std::chrono::seconds
operator""s( unsigned long long secs );
constexpr std::chrono::duration</*unspecified*/>
operator""s( long double secs );
```

Forma um literal [std::chrono::duration](<#/doc/chrono/duration>) representando segundos.

1) Literal inteiro, retorna exatamente [std::chrono::seconds](<#/doc/chrono/duration>)(secs).

2) Literal de ponto flutuante, retorna uma duration de ponto flutuante equivalente a [std::chrono::seconds](<#/doc/chrono/duration>).

### Parâmetros

- **secs** — o número de segundos

### Valor de retorno

O literal [std::chrono::duration](<#/doc/chrono/duration>).

### Possível implementação
```cpp
    constexpr std::chrono::seconds operator""s(unsigned long long s)
    {
        return std::chrono::seconds(s);
    }
    constexpr std::chrono::duration<long double> operator""s(long double s)
    {
        return std::chrono::duration<long double>(s);
    }
```

---

### Observações

Este operator é declarado no namespace std::literals::chrono_literals, onde tanto literals quanto chrono_literals são [inline namespaces](<#/doc/language/namespace>). O acesso a este operator pode ser obtido com:

  * using namespace std::literals,
  * using namespace std::chrono_literals, ou
  * using namespace std::literals::chrono_literals.

Além disso, dentro do namespace std::chrono, a diretiva using namespace literals::chrono_literals; é fornecida pela [standard library](<#/doc/standard_library>), de modo que se um programador usar using namespace std::chrono; para obter acesso às classes na [chrono library](<#/doc/chrono>), os operadores literais correspondentes também se tornam visíveis.

[std::string](<#/doc/string/basic_string>) também define operator""s, para representar objetos literais do tipo `std::string`, mas é um literal de string: 10s são dez segundos, mas "10"s é uma string de dois caracteres.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    
    int main()
    {
        using namespace std::chrono_literals;
    
        std::chrono::seconds halfmin = 30s;
        std::cout << "Half a minute is " << halfmin.count() << " seconds"
            " (" << halfmin << ").\n"
            "A minute and a second is " << (1min + 1s).count() << " seconds.\n";
    
        std::chrono::duration moment = 0.1s;
        std::cout << "A moment is " << moment.count() << " seconds"
            " (" << moment << ").\n"
            "And thrice as much is " << (moment + 0.2s).count() << " seconds.\n";
    }
```

Saída:
```
    Half a minute is 30 seconds (30s).
    A minute and a second is 61 seconds.
    A moment is 0.1 seconds (0.1s).
    And thrice as much is 0.3 seconds.
```

### Veja também

[ (constructor)](<#/doc/chrono/duration/duration>) | constrói uma nova duration
(função membro pública de `std::chrono::duration<Rep,Period>`)