# std::mbrtowc

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t mbrtowc( wchar_t* pwc,
const char* s,
std::size_t n,
std::mbstate_t* ps );
```

Converte um caractere multibyte estreito para um caractere largo.

Se s não for um ponteiro nulo, inspeciona no máximo n bytes da string de caracteres multibyte, começando com o byte apontado por s para determinar o número de bytes necessários para completar o próximo caractere multibyte (incluindo quaisquer sequências de mudança de estado). Se a função determinar que o próximo caractere multibyte em s está completo e válido, ela o converte para o caractere largo correspondente e o armazena em *pwc (se pwc não for nulo).

Se s for um ponteiro nulo, os valores de n e pwc são ignorados e a chamada é equivalente a std::mbrtowc(nullptr, "", 1, ps).

Se o caractere largo produzido for o caractere nulo, o estado de conversão armazenado em *ps é o estado de mudança inicial.

### Parâmetros

- **pwc** — ponteiro para o local onde o caractere largo resultante será escrito
- **s** — ponteiro para a string de caracteres multibyte usada como entrada
- **n** — limite no número de bytes em s que podem ser examinados
- **ps** — ponteiro para o estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

O primeiro dos seguintes que se aplica:

  * ​0​ se o caractere convertido de s (e armazenado em pwc se não nulo) foi o caractere nulo.
  * o número de bytes [1...n] do caractere multibyte convertido com sucesso de s.
  * static_cast<[std::size_t](<#/doc/types/size_t>)>(-2) se os próximos n bytes constituírem um caractere multibyte incompleto, mas até agora válido. Nada é escrito em *pwc.
  * static_cast<[std::size_t](<#/doc/types/size_t>)>(-1) se ocorrer um erro de codificação. Nada é escrito em *pwc, o valor [EILSEQ](<#/doc/error/errno_macros>) é armazenado em [errno](<#/doc/error/errno>) e o valor de *ps é deixado não especificado.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cstring>
    #include <cwchar>
    #include <iostream>
    
    void print_mb(const char* ptr)
    {
        std::mbstate_t state = std::mbstate_t(); // initial state
        const char* end = ptr + std::strlen(ptr);
        int len;
        wchar_t wc;
        while ((len = std::mbrtowc(&wc, ptr, end-ptr, &state)) > 0)
        {
            std::wcout << "Next " << len << " bytes are the character " << wc << '\n';
            ptr += len;
        }
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        const char* str = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                          // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b";
        print_mb(str);
    }
```

Saída:
```
    Next 1 bytes are the character z
    Next 2 bytes are the character ß
    Next 3 bytes are the character 水
    Next 4 bytes are the character 𝄋
```

### Veja também

[ mbtowc](<#/doc/string/multibyte/mbtowc>) | converte o próximo caractere multibyte para caractere largo
(função)
[ wcrtomb](<#/doc/string/multibyte/wcrtomb>) | converte um caractere largo para sua representação multibyte, dado o estado
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para mbrtowc