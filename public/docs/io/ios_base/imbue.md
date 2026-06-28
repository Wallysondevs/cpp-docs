# std::ios_base::imbue

[std::locale](<#/doc/locale/locale>) imbue( const [std::locale](<#/doc/locale/locale>)& loc );

Define o locale associado ao stream para `loc`. Antes de retornar, cada função, registrada por [register_callback()](<#/doc/io/ios_base/register_callback>), é chamada com `imbue_event` como parâmetro.

### Parâmetros

- **loc** — novo locale para associar ao stream

### Valor de retorno

O objeto locale associado ao stream antes da operação.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 47](<https://cplusplus.github.io/LWG/issue47>) | C++98 | o valor de retorno foi especificado incorretamente como o valor de retorno de `getloc()` | corrigido
[LWG 156](<https://cplusplus.github.io/LWG/issue156>) | C++98 | o tipo de `loc` era `const std::locale` | corrigido para `const std::locale&`

### Ver também

[ getloc](<#/doc/io/ios_base/getloc>) | retorna o locale atual
(função membro pública)