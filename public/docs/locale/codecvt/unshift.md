# std::codecvt&lt;InternT,ExternT,StateT&gt;::unshift, do_unshift

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
result unshift( StateT& state, ExternT* to, ExternT* to_end,
ExternT*& to_next ) const;
protected:
virtual result do_unshift( StateT& state, ExternT* to, ExternT* to_end,
ExternT*& to_next ) const;
```

1) Função membro pública, chama a função membro `do_unshift` da classe mais derivada.

2) Se a codificação representada por esta facet `codecvt` for dependente de estado, e `state` representar um estado de conversão que não é o estado de deslocamento inicial, escreve os caracteres necessários para retornar ao estado de deslocamento inicial. Os caracteres são escritos em um array de caracteres cujo primeiro elemento é apontado por `to`. Não mais do que `to_end - to` caracteres são escritos. O parâmetro `to_next` é atualizado para apontar para um caractere após o último caractere escrito.

### Valor de retorno

Um valor do tipo [std::codecvt_base::result](<#/doc/locale/codecvt_base>), indicando o status de sucesso da seguinte forma:

`ok` | todos os caracteres necessários foram escritos. `state` agora representa o estado de deslocamento inicial
---|---
`partial` | espaço insuficiente no buffer de saída. `to_next == to_end`
`error` | ocorreu um erro não especificado
`noconv` | a codificação não é dependente de estado, nenhuma sequência de terminação é necessária

### Notas

Esta função é chamada por [std::basic_filebuf::close()](<#/doc/io/basic_filebuf/close>) e em outras situações ao finalizar uma sequência de caracteres multibyte dependente de estado.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 305](<https://cplusplus.github.io/LWG/issue305>) | C++98 | [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>::do_unshift
era exigido que não escrevesse nenhum caractere | não exigido
[LWG 380](<https://cplusplus.github.io/LWG/issue380>) | C++98 | o significado de retornar `partial` era 'mais caracteres precisam ser fornecidos para completar a terminação', mas nenhum caractere é fornecido | corrigido para indicar
espaço insuficiente no buffer
[LWG 381](<https://cplusplus.github.io/LWG/issue381>) | C++98 | `state` não era exigido como válido, e
`error` é retornado se `state` for inválido | `state` é exigido como válido, e
retornar `error` indica um erro
[LWG 664](<https://cplusplus.github.io/LWG/issue664>) | C++98 | [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>::do_unshift
---|---|---
era exigido que não escrevesse nenhum caractere | não exigido
[LWG 665](<https://cplusplus.github.io/LWG/issue665>) | C++98 | [std::codecvt](<#/doc/locale/codecvt>)<char, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)>::do_unshift
era exigido que retornasse `noconv` | não exigido

### Veja também

[ wcrtomb](<#/doc/string/multibyte/wcrtomb>) | converte um caractere largo para sua representação multibyte, dado o estado
(função)
[ do_out](<#/doc/locale/codecvt/out>)[virtual] | converte uma string de `InternT` para `ExternT`, como ao escrever em um arquivo
(função membro virtual protegida)