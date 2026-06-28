# std::atoi, std::atol, std::atoll

Definido no cabeçalho `[<cstdlib>](<#/doc/header/cstdlib>)`

```c
int atoi( const char* str );
long atol( const char* str );
long long atoll( const char* str );
```

Interpreta um valor inteiro em uma string de bytes apontada por str. A base implícita é sempre 10.

Descarta quaisquer caracteres de espaço em branco até que o primeiro caractere não-espaço em branco seja encontrado, então pega o máximo de caracteres possível para formar uma representação numérica inteira válida e os converte para um valor inteiro. O valor inteiro válido consiste nas seguintes partes:

*   sinal de mais ou menos (opcional)
*   dígitos numéricos

Se o valor do resultado não puder ser representado, ou seja, o valor convertido estiver fora do intervalo do tipo de retorno correspondente, o comportamento é indefinido.

### Parâmetros

- **str** — ponteiro para a string de bytes terminada em nulo a ser interpretada

### Valor de retorno

Valor inteiro correspondente ao conteúdo de str em caso de sucesso.

Se nenhuma conversão puder ser realizada, ​0​ é retornado.

### Possível implementação
```cpp
    template<typename T>
    T atoi_impl(const char* str)
    {
        while (std::isspace(static_cast<unsigned char>(*str)))
            ++str;
    
        bool negative = false;
    
        if (*str == '+')
            ++str;
        else if (*str == '-')
        {
            ++str;
            negative = true;
        }
    
        T result = 0;
        for (; std::isdigit(static_cast<unsigned char>(*str)); ++str)
        {
            int digit = *str - '0';
            result *= 10;
            result -= digit; // calculate in negatives to support INT_MIN, LONG_MIN,..
        }
    
        return negative ? result : -result;
    }
    
    int atoi(const char* str)
    {
        return atoi_impl<int>(str);
    }
    
    long atol(const char* str)
    {
        return atoi_impl<long>(str);
    }
    
    long long atoll(const char* str)
    {
        return atoi_impl<long long>(str);
    }
```

---

As implementações reais da biblioteca C++ recorrem às implementações da biblioteca C de `atoi`, `atoil` e `atoll`, que as implementam diretamente (como em [MUSL libc](<https://github.com/bminor/musl/blob/master/src/stdlib/atoi.c>)) ou delegam para [strtol](<#/doc/string/byte/strtol>)/[strtoll](<#/doc/string/byte/strtol>) (como em [GNU libc](<https://github.com/bminor/glibc/blob/master/stdlib/atoi.c>)).

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <iostream>
    
    int main()
    {
        const auto data =
        {
            "42",
            "0x2A", // treated as "0" and junk "x2A", not as hexadecimal
            "3.14159",
            "31337 with words",
            "words and 2",
            "-012345",
            "10000000000" // note: out of int32_t range
        };
    
        for (const char* s : data)
        {
            const int i{std::atoi(s)};
            std::cout << "std::atoi('" << s << "') is " << i << '\n';
            if (const long long ll{std::atoll(s)}; i != ll)
                std::cout << "std::atoll('" << s << "') is " << ll << '\n';
        }
    }
```

Saída possível:
```
    std::atoi('42') is 42
    std::atoi('0x2A') is 0
    std::atoi('3.14159') is 3
    std::atoi('31337 with words') is 31337
    std::atoi('words and 2') is 0
    std::atoi('-012345') is -12345
    std::atoi('10000000000') is 1410065408
    std::atoll('10000000000') is 10000000000
```

### Veja também

[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ stoulstoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) | converte uma string para um inteiro sem sinal
(função)
[ strtolstrtoll](<#/doc/string/byte/strtol>)(C++11) | converte uma string de bytes para um valor inteiro
(função)
[ strtoulstrtoull](<#/doc/string/byte/strtoul>)(C++11) | converte uma string de bytes para um valor inteiro sem sinal
(função)
[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(C++11)(C++11) | converte uma string de bytes para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(função)
[ from_chars](<#/doc/utility/from_chars>)(C++17) | converte uma sequência de caracteres para um valor inteiro ou de ponto flutuante
(função)
[Documentação C](<#/>) para atoi, atol, atoll