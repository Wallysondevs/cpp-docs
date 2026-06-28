# std::chrono::day::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

Verifica se o valor do dia armazenado em *this está no intervalo válido, isto é, `[`1`, `31`]`.

### Valor de retorno

true se o valor do dia armazenado em *this estiver no intervalo `[`1`, `31`]`. Caso contrário, false.

### Exemplo

Execute este código
```cpp
    #include <chrono>
    using namespace std::chrono_literals;
    
    constexpr std::chrono::day d0{00};
    constexpr std::chrono::day d1{13};
    constexpr std::chrono::day d2{42};
    
    static_assert
    (
        d0 == 0d && !d0.ok() &&
        d1 == 13d && d1.ok() &&
        d2 == 42d && !d2.ok()
    );
    
    int main() {}
```

### Veja também

[ operator unsigned](<#/doc/chrono/day/operator_unsigned>) | recupera o valor do dia armazenado
(função membro pública)