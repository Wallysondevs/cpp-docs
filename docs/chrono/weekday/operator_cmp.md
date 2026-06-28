# std::chrono::operator==(std::chrono::weekday)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
constexpr bool operator==( const std::chrono::weekday& x,
const std::chrono::weekday& y ) noexcept;
```

  
Compara os dois std::chrono::weekday x e y.

O operador `!=` é [sintetizado](<#/doc/language/default_comparisons>) a partir de `operator==`.

### Valor de retorno

x.c_encoding() == y.c_encoding()

### Observações

`weekday` não suporta os operadores `<`, `<=`, `>` e `>=` porque não há um consenso universal sobre qual dia é o primeiro dia da semana.

### Exemplo

Execute este código
```
    #include <chrono>
     
    int main()
    {
        using namespace std::literals;
     
        constexpr std::chrono::weekday wd1{2};
        constexpr std::chrono::weekday wd2{std::chrono::Friday};
        static_assert(wd1 != wd2);
     
        // 13 January 1313 is a Friday
        constexpr std::chrono::weekday wd3{1313y/1/13d};
        static_assert(wd2 == wd3);
    }
```