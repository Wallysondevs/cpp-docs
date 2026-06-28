# std::mbsrtowcs

Definido no cabeçalho `[<cwchar>](<#/doc/header/cwchar>)`

```c
std::size_t mbsrtowcs( wchar_t* dst,
const char** src,
std::size_t len,
std::mbstate_t* ps );
```

Converte uma sequência de caracteres multibyte terminada em nulo, que começa no estado de conversão descrito por *ps, do array cujo primeiro elemento é apontado por *src para sua representação de caractere largo. Se dst não for nulo, os caracteres convertidos são armazenados nos elementos sucessivos do array de wchar_t apontado por dst. Não mais do que len caracteres largos são escritos no array de destino.

Cada caractere multibyte é convertido como se por uma chamada para `[std::mbrtowc](<#/doc/string/multibyte/mbrtowc>)`. A conversão para se:

  * O caractere nulo multibyte foi convertido e armazenado. src é definido como um ponteiro nulo e `*ps` representa o estado de mudança inicial.
  * Um caractere multibyte inválido (de acordo com a locale C atual) foi encontrado. src é definido para apontar para o início do primeiro caractere multibyte não convertido.
  * O próximo caractere largo a ser armazenado excederia len. src é definido para apontar para o início do primeiro caractere multibyte não convertido. Esta condição não é verificada se dst for um ponteiro nulo.

### Parâmetros

- **dst** — ponteiro para array de caracteres largos onde os resultados serão armazenados
- **src** — ponteiro para ponteiro para o primeiro elemento de uma string multibyte terminada em nulo
- **len** — número de caracteres largos disponíveis no array apontado por dst
- **ps** — ponteiro para o objeto de estado de conversão

### Valor de retorno

Em caso de sucesso, retorna o número de caracteres largos, excluindo o L'\0' terminador, escritos no array de caracteres. Se dst for um ponteiro nulo, retorna o número de caracteres largos que teriam sido escritos dada uma extensão ilimitada.

Em erro de conversão (se um caractere multibyte inválido for encontrado), retorna static_cast<[std::size_t](<#/doc/types/size_t>)>(-1), armazena [EILSEQ](<#/doc/error/errno_macros>) em [errno](<#/doc/error/errno>), e deixa *ps em estado não especificado.

### Observações

Esta função move o ponteiro src para o final da string multibyte convertida. Isso não acontece se dst for um ponteiro nulo.

### Exemplo

Execute este código
```cpp
    #include <clocale>
    #include <cwchar>
    #include <iostream>
    #include <vector>
    
    void print_as_wide(const char* mbstr)
    {
        std::mbstate_t state = std::mbstate_t();
        std::size_t len = 1 + std::mbsrtowcs(nullptr, &mbstr, 0, &state);
        std::vector<wchar_t> wstr(len);
        std::mbsrtowcs(&wstr[0], &mbstr, wstr.size(), &state);
        std::wcout << "Wide string: " << &wstr[0] << '\n'
                   << "The length, including '\\0': " << wstr.size() << '\n';
    }
    
    int main()
    {
        std::setlocale(LC_ALL, "en_US.utf8");
        const char* mbstr = "z\u00df\u6c34\U0001f34c"; // or u8"zß水🍌"
        print_as_wide(mbstr);
    }
```

Saída:
```
    Wide string: zß水🍌
    O comprimento, incluindo '\0': 5
```

### Veja também

[ mbrtowc](<#/doc/string/multibyte/mbrtowc>) | converte o próximo caractere multibyte para caractere largo, dado o estado
(função)
[ wcsrtombs](<#/doc/string/multibyte/wcsrtombs>) | converte uma string larga para string de caracteres multibyte estreitos, dado o estado
(função)
[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida de `std::codecvt<InternT,ExternT,StateT>`)
[Documentação C](<#/>) para mbsrtowcs