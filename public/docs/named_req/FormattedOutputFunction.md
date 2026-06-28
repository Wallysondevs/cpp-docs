# Requisitos nomeados C++: FormattedOutputFunction

### Requisitos

Uma FormattedOutputFunction é uma função de saída de fluxo que realiza o seguinte:

*   Constrói um objeto do tipo [`basic_ostream::sentry`](<#/doc/io/basic_ostream/sentry>) com duração de armazenamento automática, que realiza o seguinte:

    *   se [`eofbit`](<#/doc/io/ios_base/iostate>) ou [`badbit`](<#/doc/io/ios_base/iostate>) estiverem definidos no fluxo de saída, também define o `failbit`, e se as exceções em `failbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste fluxo de saída ((exceptions() & failbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
    *   descarrega o fluxo de saída associado por `tie()`, se aplicável.

*   Verifica o status do sentry chamando `sentry::operator bool()`, que é equivalente a [`basic_ios::good`](<#/doc/io/basic_ios/good>).
*   Se o sentry retornou `false` ou o construtor do sentry lançou uma exceção, nenhuma saída ocorre.
*   Se o sentry retornou `true`, tenta realizar a saída desejada inserindo os caracteres no fluxo de saída como se chamasse `rdbuf()->sputc()`. Outros membros públicos de [std::basic_ostream](<#/doc/io/basic_ostream>) também podem ser usados, mas membros virtuais de `rdbuf()` exceto [`overflow()`](<#/doc/io/basic_streambuf/overflow>), [`xsputn()`](<#/doc/io/basic_streambuf/sputn>) e [`sync()`](<#/doc/io/basic_streambuf/pubsync>) nunca serão chamados.

    *   Se a saída não pôde ser gerada, define `failbit`. Se as exceções em `failbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste fluxo ((exceptions() & failbit) != 0), lança [`ios_base::failure`](<#/doc/io/ios_base/failure>).
    *   se uma exceção for lançada durante a saída, define `badbit` no fluxo de saída. Se as exceções em `badbit` estiverem habilitadas na [máscara de exceção](<#/doc/io/basic_ios/exceptions>) deste fluxo ((exceptions() & badbit) != 0), a exceção também é relançada.
    *   Se nenhuma exceção foi lançada, retorna `*this`.

*   Em qualquer caso, seja terminando por exceção ou retornando, o destrutor do sentry é chamado antes de sair desta função.

### Preenchimento (Padding)

Funções de saída formatada determinam o preenchimento de acordo com o estágio 3 de [`std::num_put::do_put()`](<#/doc/locale/num_put/put>). | (até C++14)
---|---
Se uma função de saída formatada de um fluxo `os` determina o preenchimento, ela o faz da seguinte forma. Dada uma sequência de caracteres `seq` de `CharT`, onde `CharT` é o [tipo de contêiner de caracteres](<#/doc/string>) de `os`, se o comprimento de `seq` for menor que `os.width()`, então cópias suficientes de `os.fill()` são adicionadas a esta sequência conforme necessário para preencher até uma largura de `os.width()` caracteres. Se `(os.flags() & [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)) == [std::ios_base::left](<#/doc/io/ios_base/fmtflags>)` for verdadeiro, os caracteres de preenchimento são colocados após a sequência de caracteres; caso contrário, são colocados antes da sequência de caracteres. | (desde C++14)

### Biblioteca padrão

As seguintes funções da biblioteca padrão são **FormattedOutputFunction s**.

*   [`basic_ostream::operator<<(std::basic_ostream&, int / long / double / void* / bool)`](<#/doc/io/basic_ostream/operator_ltlt>)
*   [`operator<<(std::basic_ostream&, char)`](<#/doc/io/basic_ostream/operator_ltlt2>)
*   [`operator<<(std::basic_ostream&, char*)`](<#/doc/io/basic_ostream/operator_ltlt2>)
*   [`operator<<(std::basic_ostream&, const std::bitset&)`](<#/doc/utility/bitset/operator_ltltgtgt2>)
*   [`operator<<(std::basic_ostream&, const std::basic_string&)`](<#/doc/string/basic_string/operator_ltltgtgt>)
*   `operator<< `, quando chamada no valor de retorno de [std::put_money](<#/doc/io/manip/put_money>)

*   [`operator<<(std::basic_ostream&, std::basic_string_view)`](<#/doc/string/basic_string_view/operator_ltlt>)

| (desde C++17)

*   [`print(std::ostream&, std::format_string<Args...>, Args&&...)`](<#/doc/io/basic_ostream/print>),
*   [`println(std::ostream&, std::format_string<Args...>, Args&&...)`](<#/doc/io/basic_ostream/println>),
*   [`vprint_unicode(std::ostream&, std::string_view, std::format_args)`](<#/doc/io/basic_ostream/vprint_unicode>),
*   [`vprint_nonunicode(std::ostream&, std::string_view, std::format_args)`](<#/doc/io/basic_ostream/vprint_nonunicode>),

    exceto que (dado que `os` é um objeto de fluxo de saída):

*   qualquer exceção lançada pela chamada para [std::vformat](<#/doc/utility/format/vformat>) é propagada sem considerar o valor de `os.exceptions()` e sem ativar `ios_base::badbit` no estado de erro de `os`;
*   se a inserção em `os` falhar, chama `os.setstate(ios_base::badbit)` (o que pode lançar [ios_base::failure](<#/doc/io/ios_base/failure>)).

| (desde C++23)

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 160](<https://cplusplus.github.io/LWG/issue160>) | C++98 | o processo de determinar se a exceção capturada é relançada mencionava uma função `exception()` não existente | corrigido para [`exceptions()`](<#/doc/io/basic_ios/exceptions>)
[LWG 165](<https://cplusplus.github.io/LWG/issue165>) | C++98 | o único membro virtual permitido de ser chamado em `rdbuf()` era `overflow()` | também permitiu `xsputn()` e `sync()`