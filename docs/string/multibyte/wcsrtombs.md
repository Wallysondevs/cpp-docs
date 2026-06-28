# std::wcsrtombs

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t wcsrtombs( char* dst,
const wchar_t** src,
std::size_t len,
std::mbstate_t* ps );
```

Converte uma sequência de caracteres largos do array cujo primeiro elemento é apontado por *src para sua representação multibyte estreita que começa no estado de conversão descrito por *ps. Se dst não for nulo, os caracteres convertidos são armazenados nos elementos sucessivos do array de char apontado por dst. Não mais que len bytes são escritos no array de destino.

Cada caractere é convertido como se por uma chamada para [std::wcrtomb](<#/doc/string/multibyte/wcrtomb>). A conversão para se:

  * O caractere nulo foi convertido e armazenado. src é definido como um ponteiro nulo e *ps representa o estado de deslocamento inicial.
  * Um wchar_t foi encontrado que não corresponde a um caractere válido na locale C atual. src é definido para apontar para o primeiro caractere largo não convertido.
  * O próximo caractere multibyte a ser armazenado excederia len. src é definido para apontar para o primeiro caractere largo não convertido. Esta condição não é verificada se dst for um ponteiro nulo.

### Parâmetros

- **dst** — ponteiro para o array de caracteres estreitos onde os caracteres multibyte serão armazenados
- **src** — ponteiro para ponteiro para o primeiro elemento de uma string larga terminada em nulo
- **len** — número de bytes disponíveis no array apontado por dst
- **ps** — ponteiro para o objeto de estado de conversão

### Valor de retorno

Em caso de sucesso, retorna o número de bytes (incluindo quaisquer sequências de deslocamento, mas excluindo o '\0' terminador) escritos no array de caracteres cujo primeiro elemento é apontado por dst. Se dst for um ponteiro nulo, retorna o número de bytes que teriam sido escritos (novamente, excluindo o caractere nulo terminador '\0').

Em erro de conversão (se um caractere largo inválido for encontrado), retorna static_cast<[std::size_t](<#/doc/types/size_t>)>(-1), armazena [EILSEQ](<#/doc/error/errno_macros>) em [errno](<#/doc/error/errno>), e deixa *ps em estado não especificado.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <string>
    #include <vector>
    
    void print_wide(const wchar_t* wstr)
    {
        std::mbstate_t state = std::mbstate_t();
        std::size_t len = 1 + std::wcsrtombs(nullptr, &wstr, 0, &state);
        std::vector<char> mbstr(len);
        std::wcsrtombs(&mbstr[0], &wstr, mbstr.size(), &state);
        std::cout << "multibyte string: " << &mbstr[0] << '\n'
                  << "Length, including '\\0': " << mbstr.size() << '\n';
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        // UTF-8 narrow multibyte encoding
        const wchar_t* wstr = L"z\u00df\u6c34\U0001d10b"; // or L"zß水𝄋"
        print_wide(wstr);
    }
```

Saída:
```
    multibyte string: zß水𝄋
    Length, including '\0': 11
```

### Veja também

[ wcrtomb](<#/doc/string/multibyte/wcrtomb>) | converte um caractere largo para sua representação multibyte, dado o estado
(função)
[ mbsrtowcs](<#/doc/string/multibyte/mbsrtowcs>) | converte uma string de caracteres multibyte estreitos para string larga, dado o estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para wcsrtombs