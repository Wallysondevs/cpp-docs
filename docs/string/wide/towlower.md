# std::towlower

Definido no cabeçalho `[<cwctype>](<#/doc/header/cwctype>)`

```c
std::wint_t towlower( std::wint_t ch );
```

Converte o wide character fornecido para minúsculas, se possível.

Se o valor de ch não for representável como um wchar_t nem igual ao valor da macro WEOF, o comportamento é indefinido.

### Parâmetros

- **ch** — wide character a ser convertido

### Valor de retorno

Versão em minúsculas de ch ou ch não modificado se nenhuma versão em minúsculas estiver listada na locale C atual.

### Observações

Apenas mapeamento de caracteres 1:1 pode ser realizado por esta função, por exemplo, a letra maiúscula grega 'Σ' tem duas formas minúsculas, dependendo da posição em uma palavra: 'σ' e 'ς'. Uma chamada para `std::towlower` não pode ser usada para obter a forma minúscula correta neste caso.

[ISO 30112](<https://www.open-std.org/JTC1/SC35/WG5/docs/30112d10.pdf>) especifica quais pares de caracteres Unicode estão incluídos neste mapeamento.

### Exemplo

Execute este código
```
    #include <clocale>
    #include <cwctype>
    #include <iostream>
    
    int main()
    {
        wchar_t c = L'\u0190'; // Latin capital open E ('Ɛ')
    
        std::cout << std::hex << std::showbase;
        std::cout << "in the default locale, towlower("
                  << static_cast<std::wint_t>(c) << ") = "
                  << std::towlower(c) << '\n';
        std::setlocale(LC_ALL, "en_US.utf8");
        std::cout << "in Unicode locale, towlower("
                  << static_cast<std::wint_t>(c) << ") = "
                  << std::towlower(c) << '\n';
    }
```

Saída:
```
    in the default locale, towlower(0x190) = 0x190
    in Unicode locale, towlower(0x190) = 0x25b
```

### Veja também

[ towupper](<#/doc/string/wide/towupper>) | converte um wide character para maiúsculas
(função)
[ tolower(std::locale)](<#/doc/locale/tolower>) | converte um caractere para minúsculas usando a facet `ctype` de uma locale
(modelo de função)
[ tolower](<#/doc/string/byte/tolower>) | converte um caractere para minúsculas
(função)
[Documentação C](<#/>) para towlower