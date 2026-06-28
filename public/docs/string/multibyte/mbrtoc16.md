# std::mbrtoc16

Definido no cabeçalho `[<cuchar>](<#/doc/header/cuchar>)`

```c
std::size_t mbrtoc16( char16_t* pc16,
const char* s,
std::size_t n,
std::mbstate_t* ps );
```

Converte um caractere multibyte estreito para a representação de caractere UTF-16.

Se s não for um ponteiro nulo, inspeciona no máximo n bytes da string de caracteres multibyte, começando com o byte apontado por s para determinar o número de bytes necessários para completar o próximo caractere multibyte (incluindo quaisquer sequências de mudança de estado). Se a função determinar que o próximo caractere multibyte em s está completo e válido, ela o converte para o caractere de 16 bits correspondente e o armazena em *pc16 (se pc16 não for nulo).

Se o caractere multibyte em *s corresponder a uma sequência multi-char16_t (por exemplo, um par substituto em UTF-16), então, após a primeira chamada a esta função, *ps é atualizado de tal forma que a próxima chamada a `mbrtoc16` escreverá o char16_t adicional, sem considerar *s.

Se s for um ponteiro nulo, os valores de n e pc16 são ignorados e a chamada é equivalente a std::mbrtoc16(nullptr, "", 1, ps).

Se o caractere largo produzido for o caractere nulo, o estado de conversão *ps representa o estado de mudança inicial.

A codificação multibyte usada por esta função é especificada pela locale C atualmente ativa.

### Parâmetros

- **pc16** — ponteiro para o local onde o caractere de 16 bits resultante será escrito
- **s** — ponteiro para a string de caracteres multibyte usada como entrada
- **n** — limite no número de bytes em s que podem ser examinados
- **ps** — ponteiro para o objeto de estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

O primeiro dos seguintes que se aplica:

* ​0​ se o caractere convertido de s (e armazenado em *pc16 se não nulo) era o caractere nulo.
* o número de bytes [1...n] do caractere multibyte convertido com sucesso de s.
* -3 se o próximo char16_t de um caractere multi-char16_t (por exemplo, um par substituto) foi agora escrito em *pc16. Nenhum byte é processado da entrada neste caso.
* -2 se os próximos n bytes constituem um caractere multibyte incompleto, mas até agora válido. Nada é escrito em *pc16.
* -1 se ocorrer um erro de codificação. Nada é escrito em *pc16, o valor [EILSEQ](<#/doc/error/errno_macros>) é armazenado em [errno](<#/doc/error/errno>) e o valor de *ps é não especificado.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstring>
    #include <cuchar>
    #include <cwchar>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
    
        std::string str = "z\u00df\u6c34\U0001F34C"; // or u8"zß水🍌"
    
        std::cout << "Processing " << str.size() << " bytes: [ " << std::showbase;
        for (unsigned char c: str)
            std::cout << std::hex << +c << ' ';
        std::cout << "]\n";
    
        std::mbstate_t state{}; // zero-initialized to initial state
        char16_t c16;
        const char* ptr = &str[0], *end = &str[0] + str.size();
    
        while (std::size_t rc = std::mbrtoc16(&c16, ptr, end - ptr + 1, &state))
        {
            std::cout << "Next UTF-16 char: " << std::hex
                      << static_cast<int>(c16) << " obtained from ";
            if (rc == (std::size_t)-3)
                std::cout << "earlier surrogate pair\n";
            else if (rc == (std::size_t) - 2)
                break;
            else if (rc == (std::size_t) - 1)
                break;
            else
            {
                std::cout << std::dec << rc << " bytes [ ";
                for (std::size_t n = 0; n < rc; ++n)
                    std::cout << std::hex << +static_cast<unsigned char>(ptr[n]) << ' ';
                std::cout << "]\n";
                ptr += rc;
            }
        }
    }
```

Saída:
```
    Processing 10 bytes: [ 0x7a 0xc3 0x9f 0xe6 0xb0 0xb4 0xf0 0x9f 0x8d 0x8c ]
    Next UTF-16 char: 0x7a obtained from 1 bytes [ 0x7a ]
    Next UTF-16 char: 0xdf obtained from 2 bytes [ 0xc3 0x9f ]
    Next UTF-16 char: 0x6c34 obtained from 3 bytes [ 0xe6 0xb0 0xb4 ]
    Next UTF-16 char: 0xd83c obtained from 4 bytes [ 0xf0 0x9f 0x8d 0x8c ]
    Next UTF-16 char: 0xdf4c obtained from earlier surrogate pair
```

### Veja também

[ c16rtomb](<#/doc/string/multibyte/c16rtomb>)(desde C++11) | converte um caractere UTF-16 para codificação multibyte estreita
(função)
[ mbrtoc8](<#/doc/string/multibyte/mbrtoc8>)(C++20) | converte um caractere multibyte estreito para codificação UTF-8
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para mbrtoc16