# std::wcrtomb

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t wcrtomb( char* s, wchar_t wc, std::mbstate_t* ps );
```

Converte um caractere largo para sua representação multibyte estreita.

Se s não for um ponteiro nulo, a função determina o número de bytes necessários para armazenar a representação de caractere multibyte de wc (incluindo quaisquer sequências de mudança, e levando em conta o estado de conversão multibyte atual *ps), e armazena a representação de caractere multibyte no array de caracteres cujo primeiro elemento é apontado por s, atualizando *ps conforme necessário. No máximo MB_CUR_MAX bytes podem ser escritos por esta função.

Se s for um ponteiro nulo, a chamada é equivalente a std::wcrtomb(buf, L'\0', ps) para algum buffer interno `buf`.

Se wc for o caractere largo nulo L'\0', um byte nulo é armazenado, precedido por qualquer sequência de mudança necessária para restaurar o estado de mudança inicial e o parâmetro de estado de conversão *ps é atualizado para representar o estado de mudança inicial.

### Parâmetros

- **s** — ponteiro para um array de caracteres estreitos onde o caractere multibyte será armazenado
- **wc** — o caractere largo a ser convertido
- **ps** — ponteiro para o objeto de estado de conversão usado ao interpretar a string multibyte

### Valor de retorno

Em caso de sucesso, retorna o número de bytes (incluindo quaisquer sequências de mudança) escritos no array de caracteres cujo primeiro elemento é apontado por s.

Em caso de falha (se wc não for um caractere largo válido), retorna static_cast<[std::size_t](<#/doc/types/size_t>)>(-1), armazena [EILSEQ](<#/doc/error/errno_macros>) em [errno](<#/doc/error/errno>), e deixa *ps em estado não especificado.

### Exemplo

Run this code
```
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <string>
    
    void print_wide(const std::wstring& wstr)
    {
        std::mbstate_t state{};
        for (wchar_t wc : wstr)
        {
            std::string mb(MB_CUR_MAX, '\0');
            std::size_t ret = std::wcrtomb(&mb[0], wc, &state);
            std::cout << "multibyte char " << mb << " is " << ret << " bytes\n";
        }
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        std::wstring wstr = L"z\u00df\u6c34\U0001f34c"; // or L"zß水🍌"
        print_wide(wstr);
    }
```

Output:
```
    multibyte char z is 1 bytes
    multibyte char ß is 2 bytes
    multibyte char 水 is 3 bytes
    multibyte char 🍌 is 4 bytes
```

### Veja também

[ wctomb](<#/doc/string/multibyte/wctomb>) | converte um caractere largo para sua representação multibyte
(função)
[ mbrtowc](<#/doc/string/multibyte/mbrtowc>) | converte o próximo caractere multibyte para caractere largo, dado o estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para wcrtomb