# std::chrono::weekday::ok

```cpp
constexpr bool ok() const noexcept;  // (desde C++20)
```

  
Verifica se o valor do dia da semana armazenado em *this está no intervalo válido, ou seja, `[`​0​`, `6`]`. 

### Valor de retorno

true se o valor do dia da semana armazenado em *this estiver no intervalo `[`​0​`, `6`]`. Caso contrário, false. 

### Exemplo

Execute este código
```cpp 
    #include <chrono>
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <string>
    
    struct weekday_ok : std::numpunct<char>
    {
        std::string do_truename()  const override { return " (is valid weekday)"; }
        std::string do_falsename() const override { return " (is not valid weekday)"; }
    };
    
    int main()
    {
        std::cout.imbue(std::locale(std::cout.getloc(), new weekday_ok));
        std::cout << std::boolalpha;
    
        for (const unsigned u : {0 /* Sun */, 1 /* Mon */, 6, 7 /* Sun */, 8, 9})
        {
            const std::chrono::weekday wd{u};
            std::cout << "u: " << u << "; wd: " << wd.c_encoding() << wd.ok() << '\n';
        }
    }
```

Saída: 
```
    u: 0; wd: 0 (is valid weekday)
    u: 1; wd: 1 (is valid weekday)
    u: 6; wd: 6 (is valid weekday)
    u: 7; wd: 0 (is valid weekday)
    u: 8; wd: 8 (is not valid weekday)
    u: 9; wd: 9 (is not valid weekday)
```

### Veja também

[ c_encodingiso_encoding](<#/doc/chrono/weekday/encoding>) | recupera o valor do dia da semana armazenado  
recupera o valor do dia da semana ISO 8601   
(função membro pública)  