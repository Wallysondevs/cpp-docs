# std::codecvt&lt;InternT,ExternT,StateT&gt;::length, do_length

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
int length( StateT& state, const ExternT* from, const ExternT* from_end,
std::size_t max ) const;
protected:
virtual int do_length( StateT& state, const ExternT* from, const ExternT* from_end,
std::size_t max ) const;
```

1) Função membro pública, chama a função membro `do_length` da classe mais derivada.

2) Tenta converter os caracteres `ExternT` do array de caracteres definido por `[`from`, `from_end`)`, dado o estado de conversão inicial `state`, para no máximo `max` caracteres `InternT`, e retorna o número de caracteres `ExternT` que tal conversão consumiria. Modifica `state` como se estivesse executando do_in(state, from, from_end, from, to, to + max, to) para algum buffer de saída imaginário `[`to`, `to + max`)`.

### Valor de retorno

O número de caracteres `ExternT` que seriam consumidos se convertidos por [do_in()](<#/doc/locale/codecvt/in>) até que todos os caracteres `from_end - from` fossem consumidos ou `max` caracteres `InternT` fossem produzidos, ou um erro de conversão ocorresse.

A especialização não conversora [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> retorna [std::min](<#/doc/algorithm/min>)(max, from_end - from).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    #include <string>
    
    int main()
    {
        using facet_type = std::codecvt<wchar_t, char, std::mbstate_t>;
    
        // narrow multibyte encoding
        std::string s = "z\u00df\u6c34\U0001d10b"; // or u8"zß水𝄋"
                  // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b"
    
        std::locale loc("en_US.UTF-8");
        facet_type const& codecvt_facet = std::use_facet<facet_type>(loc);
        std::mbstate_t mb = std::mbstate_t();
        std::cout << "Only the first "
                  << codecvt_facet.length(mb, s.data(), s.data() + s.size(), 2)
                  << " bytes out of " << s.size() << " would be consumed"
                     " to produce the first 2 characters\n";
    }
```

Saída:
```
    Only the first 3 bytes out of 10 would be consumed to produce the first 2 characters
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 75](<https://cplusplus.github.io/LWG/issue75>) | C++98 | o efeito no estado não foi especificado | especificado
[LWG 305](<https://cplusplus.github.io/LWG/issue305>) | C++98 | `std::codecvt<wchar_t, char, std::mbstate_t>::do_length`
era exigido que retornasse [std::min](<#/doc/algorithm/min>)(max, from_end - from) | não exigido

### Veja também

[ do_in](<#/doc/locale/codecvt/in>)[virtual] | converte uma string de `ExternT` para `InternT`, como ao ler de um arquivo
(função membro virtual protegida)